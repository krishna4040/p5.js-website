interface IconProps {
  kind: "arrow" | "code-brackets";
  className?: string;
}
/**
 * Renders an icon
 */
export const Icon = (props: IconProps) => {
  switch (props.kind) {
    case "arrow":
      return (
        <svg
          width="21"
          height="11"
          viewBox="0 0 21 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className={props.className}
        >
          <path
            d="M15.353 0.146446L20.7065 5.5L15.353 10.8536C15.1577 11.0488 14.8411 11.0488 14.6459 10.8536C14.4506 10.6583 14.4506 10.3417 14.6459 10.1464L18.7923 6L4.99951 6C4.72337 6 4.49951 5.77614 4.49951 5.5C4.49951 5.22386 4.72337 5 4.99951 5L18.7923 5L14.6459 0.853553C14.4506 0.658291 14.4506 0.341708 14.6459 0.146446C14.8411 -0.0488155 15.1577 -0.0488155 15.353 0.146446Z"
            fill="black"
          />
        </svg>
      );
    case "code-brackets":
      return (
        <svg
          width="22"
          height="18"
          viewBox="0 0 22 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className={props.className}
        >
          <path
            d="M13.9764 0.718843C14.0606 0.455859 13.9105 0.193701 13.641 0.133296C13.3716 0.0728911 13.0848 0.237114 13.0006 0.500098L7.87626 16.5001C7.79204 16.7631 7.94219 17.0252 8.21165 17.0856C8.4811 17.146 8.76782 16.9818 8.85205 16.7188L13.9764 0.718843Z"
            fill="black"
          />
          <path
            d="M21.707 8.49999L16.3535 3.14644C16.1582 2.95118 15.8416 2.95118 15.6464 3.14644C15.4511 3.3417 15.4511 3.65828 15.6464 3.85355L20.2928 8.49999L15.6464 13.1464C15.4511 13.3417 15.4511 13.6583 15.6464 13.8535C15.8416 14.0488 16.1582 14.0488 16.3535 13.8535L21.707 8.49999Z"
            fill="black"
          />
          <path
            d="M0.292969 8.49999L5.64652 13.8535C5.84178 14.0488 6.15837 14.0488 6.35363 13.8535C6.54889 13.6583 6.54889 13.3417 6.35363 13.1464L1.70718 8.49999L6.35363 3.85355C6.54889 3.65828 6.54889 3.3417 6.35363 3.14644C6.15837 2.95118 5.84178 2.95118 5.64652 3.14644L0.292969 8.49999Z"
            fill="black"
          />
        </svg>
      );
    default:
      return null;
  }
};
