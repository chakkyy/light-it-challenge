export enum ToastDuration {
  SHORT = 3000,
  MEDIUM = 5000,
  LONG = 8000,
}

export const getToastDuration = (message: string | JSX.Element): number => {
  if (typeof message !== 'string') return ToastDuration.MEDIUM;

  const wordCount = message.split(' ').length;
  if (wordCount <= 5) return ToastDuration.SHORT;
  if (wordCount <= 15) return ToastDuration.MEDIUM;
  return ToastDuration.LONG;
};
