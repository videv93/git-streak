import { useMemo } from 'react';

interface ContributionGridProps {
  data: number[];
}

export const ContributionGrid = ({ data }: ContributionGridProps) => {
  const getContributionLevel = (value: number) => {
    if (value === 0) return 0;
    if (value <= 3) return 1;
    if (value <= 6) return 2;
    if (value <= 9) return 3;
    return 4;
  };

  const cells = useMemo(() => {
    return data.map((value, index) => {
      const level = getContributionLevel(value);
      return (
        <div
          key={index}
          className={`contribution-cell contribution-level-${level}`}
          title={`${value} contributions`}
        />
      );
    });
  }, [data]);

  return <div className="contribution-grid">{cells}</div>;
};