import { Controller, Get, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('OIDC')
@Controller('session')
export class SessionController {
  @Get('check')
  check(@Req() req: Request, @Res() res: Response) {
    const isAlive = !!req.session?.userId;
    const sessionId = req.sessionID;

    res.type('html').send(`
      <!DOCTYPE html><html><body>
        <script>
          window.parent.postMessage({
            sessionAlive: ${isAlive},
            sessionId: '${sessionId}',
            timestamp: Date.now()
          }, '*');
        </script>
      </body></html>
    `);
  }
}
