type FooterGradProps = {
  variant?: 'full' | 'cropped';
  height?: number;
};

export default function FooterGrad({
  variant = 'full',
  height = 160,
}: FooterGradProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={variant === 'cropped' ? { height } : undefined}
    >
      <img
        src="/assets/bg/Strip.png"
        alt="Footer Background"
        loading="lazy"
        className={
          variant === 'cropped'
            ? 'w-full h-full object-cover block'
            : 'w-full h-auto block'
        }
      />

      {/* Optional overlay */}
      <div className="absolute inset-0 bg-white/5 pointer-events-none mix-blend-soft-light" />
    </div>
  );
}
