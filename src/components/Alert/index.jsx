import './style.scss';
import { useEffect } from 'react';

export default function Alert({
  message,
  variant = 'success',
  show = false,
  duration = 2000,
  actionClose,
}) {
  useEffect(() => {
    setTimeout(() => {
      actionClose();
    }, duration);
  }, [show]);

  return (
    <>
      {show && (
        <div className={'Alert ' + variant} onClick={actionClose}>
          {message}
        </div>
      )}
    </>
  );
}
