export const Image = ({
  src,
  width,
  height,
  size = 'contain',
  className = '',
  onClick = null,
  children = null
}) => (
  <div
    className={`image ${className}`}
    style={{
      background: `url(assets/${src}) no-repeat center center`,
      backgroundSize: size,
      width: `${width}px`,
      height: `${height}px`
    }}
    onClick={onClick}
  >
    {children}
  </div>
);
