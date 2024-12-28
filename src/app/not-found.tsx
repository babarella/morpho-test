import { UiButton, UiIcon } from '@/components/ui'
import styles from './NotFound.module.scss'

export default function NotFoundPage() {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorTitle}>
        <UiIcon variant="exclamationCircle" size={15} className={styles.errorIcon} />
        <span>Not found</span>
      </div>
      <div className={styles.errorMessage}>We could not find the page you were looking for.</div>
      <UiButton href="/">Try again</UiButton>
    </div>
  )
}
