interface AlertMessageProps {
  message?: string;
}

type AlertMessageComponents = {
  Error: (props: AlertMessageProps) => JSX.Element | null;
  Success: (props: AlertMessageProps) => JSX.Element | null;
};

function Error({ message }: AlertMessageProps): JSX.Element | null {
  return (message && <span>{message}</span>) || null;
}

function Success({ message }: AlertMessageProps): JSX.Element | null {
  return (message && <span>{message}</span>) || null;
}

const AlertMessage: AlertMessageComponents = {
  Error,
  Success,
} as const;

export default AlertMessage;
