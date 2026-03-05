export interface FabMenuItem {
    iconSrc: string;
    label: string;
    action: () => void;
    disabled?: boolean;
}
