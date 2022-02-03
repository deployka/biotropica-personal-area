interface Goal {
  id: number;
  name: string;
  type: GoalType;
  units: ISelect<Partial<GoalUnits> | null>[];
  description: string;
  values: GoalValue[];
  startResult: number;
  endResult: number;
  userId: number;
  completed: boolean;
  createdAt: string;
}

type GoalUnits = {
  [GoalType.RUN]: RunUnits;
  [GoalType.WEIGHT]: WeightUnits;
  [GoalType.FORCE]: ForceUnits;
};

interface GoalValue {
  value: number;
  createdAt: Date;
}
