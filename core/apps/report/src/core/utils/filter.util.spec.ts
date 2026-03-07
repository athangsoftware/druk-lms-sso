import { buildFilterSql, injectFilters, validateColumnName } from './filter.util';
import { FilterType } from '@app/prisma';

describe('filter.util', () => {
  describe('validateColumnName', () => {
    it('allows valid names', () => {
      expect(() => validateColumnName('country')).not.toThrow();
      expect(() => validateColumnName('schema.table.column')).not.toThrow();
    });
    it('rejects invalid names', () => {
      expect(() => validateColumnName('123bad')).toThrow();
      expect(() => validateColumnName('name;DROP')).toThrow();
    });
  });

  describe('buildFilterSql', () => {
    const defs = [
      { id: 'f1', filterType: 'MULTI_SELECT' as FilterType, targetColumn: 'col1' },
      { id: 'f2', filterType: 'SINGLE_SELECT' as FilterType, targetColumn: 'col2' },
      { id: 'f3', filterType: 'DATE_RANGE' as FilterType, targetColumn: 'col3' },
      { id: 'f4', filterType: 'TEXT' as FilterType, targetColumn: 'col4' },
      { id: 'f5', filterType: 'NUMBER' as FilterType, targetColumn: 'col5' },
    ];

    it('produces correct clause for multi select', () => {
      const sql = buildFilterSql(defs, { f1: ['A', 'B'] });
      expect(sql).toContain(`AND col1 IN ('A','B')`);
    });
    it('skips empty', () => {
      expect(buildFilterSql(defs, {})).toBe('');
    });
    it('handles date ranges', () => {
      const sql = buildFilterSql(defs, { f3: { startDate: '2020-01-01', endDate: '2020-12-31' } });
      expect(sql).toContain(`AND col3 BETWEEN '2020-01-01' AND '2020-12-31'`);
    });
    it('handles text like', () => {
      const sql = buildFilterSql(defs, { f4: 'foo' });
      expect(sql).toContain(`AND col4 LIKE '%foo%'`);
    });
    it('handles number operators', () => {
      const sql = buildFilterSql(defs, { f5: { operator: 'gt', value: 5 } });
      expect(sql).toContain(`AND col5 > 5`);
    });
  });

  describe('injectFilters', () => {
    it('replaces placeholder', () => {
      const original = 'SELECT * FROM t WHERE 1=1 {{filters}}';
      const out = injectFilters(original, 'AND x=1');
      expect(out).toBe('SELECT * FROM t WHERE 1=1 AND x=1');
    });
    it('appends when no placeholder', () => {
      const original = 'SELECT * FROM t WHERE a=1';
      const out = injectFilters(original, 'AND x=1');
      expect(out).toMatch(/WHERE a=1[\s\S]*AND x=1/);
    });
    it('adds where when none exist', () => {
      const original = 'SELECT * FROM t';
      const out = injectFilters(original, 'AND x=1');
      expect(out).toMatch(/WHERE x=1$/);
    });
  });
});
