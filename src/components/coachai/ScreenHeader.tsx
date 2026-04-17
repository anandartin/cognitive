import Logo from "./Logo";

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      <Logo size={52} />
      <div className="flex flex-col gap-2">
        <h1 className="text-white text-[28px] font-bold tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/60 text-[15px] leading-[1.45] max-w-[320px]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
