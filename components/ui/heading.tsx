type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4;
};

export default function Heading({ children, level = 1 }: HeadingProps) {
  const levelLookup = {
    1: (
      <h1 className="scroll-m-20 tracking-tight text-4xl font-extrabold lg:text-5xl">
        {children}
      </h1>
    ),
    2: (
      <h2 className="scroll-m-20 tracking-tight text-3xl font-semibold">
        {children}
      </h2>
    ),
    3: (
      <h3 className="scroll-m-20 tracking-tight text-2xl font-semibold">
        {children}
      </h3>
    ),
    4: (
      <h4 className="scroll-m-20 tracking-tight text-xl font-semibold">
        {children}
      </h4>
    ),
  };

  return levelLookup[level];
}
