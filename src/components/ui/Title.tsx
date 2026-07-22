type TitleProps = {
  heading: string;
  subHeading?: string;
};

const Title = ({ heading, subHeading }: TitleProps) => {
  return (
    <div
      className="text-center  max-w-2xl mx-auto
     px-4 pb-8 md:pb-10 lg:pb-12 flex flex-col gap-2"
    >
      <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
        {heading}
      </h2>
      <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
        {subHeading}
      </p>
    </div>
  );
};

export default Title;
