type Anchor = 'top' | 'bottom' | 'left' | 'right';
type Variant = 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain';

interface SnackbarState {
  show: boolean;
  text: string;
  color: string;
  location: Anchor;
  multiLine: boolean;
  timeout: number;
  variant: Variant;
}

interface SnackbarProps {
  show?: boolean;
  text?: string;
  color?: string;
  location?: Anchor;
  multiLine?: boolean;
  timeout?: number;
  variant?: Variant;
}

export const useSnackbarStore = defineStore('snackbar', {
  state: (): { snackbar: SnackbarState } => ({
    snackbar: {
      show: false,
      text: '',
      color: 'success',
      location: 'bottom',
      multiLine: false,
      timeout: 5000,
      variant: 'elevated',
    },
  }),
  actions: {
    fireSnack(props: SnackbarProps) {

      this.snackbar.show = props?.show ?? this.snackbar?.show;
      this.snackbar.text = props?.text ?? this.snackbar?.text;
      this.snackbar.color = props?.color ?? this.snackbar?.color;
      this.snackbar.location = props?.location ?? this.snackbar?.location;
      this.snackbar.multiLine = props?.multiLine ?? this.snackbar?.multiLine;
      this.snackbar.timeout = props?.timeout ?? this.snackbar?.timeout;
      this.snackbar.variant = props?.variant ?? this.snackbar?.variant;
    },
  },
});
