export const FlexContainer = ({
  flexDirection = 'initial',
  justifyContent = 'initial',
  alignItems = 'initial',
  className = '',
  children = null
}) => (
  <div
    className={`flex_container ${className}`}
    style={{
      display: 'flex',
      flexDirection,
      justifyContent,
      alignItems,
    }}
  >
    {children}
  </div>
);
