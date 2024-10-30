type Anchor = 'top' | 'bottom' | 'left' | 'right'

interface SnackbarState {
  isVisible: boolean
  text: string
  type: string
  location: Anchor
  timeout: number
}

interface SnackbarProps {
  isVisible?: boolean
  text?: string
  type?: string
  location?: Anchor
  timeout?: number
}

export const useSnackbarStore = defineStore('snackbar', {
  state: () => ({
    snackbarTimeoutId: null as ReturnType<typeof setTimeout> | null,
    snackbar: {
      isVisible: false,
      text: '',
      type: 'success',
      location: 'bottom',
      timeout: 4000
    } as SnackbarState
  }),
  actions: {
    fireSnack(props: SnackbarProps) {
      if (this.snackbarTimeoutId) {
        this.snackbar.isVisible = false
        clearTimeout(this.snackbarTimeoutId)
      }
      this.snackbar.type = props?.type ?? this.snackbar?.type
      this.snackbar.isVisible = props?.isVisible ?? this.snackbar?.isVisible
      this.snackbar.text = props?.text ?? this.snackbar?.text
      this.snackbar.location = props?.location ?? this.snackbar?.location
      this.snackbar.timeout = props?.timeout ?? this.snackbar?.timeout

      this.snackbarTimeoutId = setTimeout(() => {
        this.snackbar.isVisible = false
      }, this.snackbar.timeout)
    },
    closeSnackbar() {
      this.snackbar.isVisible = false
    }
  }
})
