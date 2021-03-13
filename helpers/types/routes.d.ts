type FullRoute = {
  uuid: string;
  title: string;
  description: string;
  availableFrom: string; //timestamp
  type: 'ORIENTATION' | 'MIX';

  steps: Step[];
  emergancyContact?: {
    name: string;
    phone: string;
  };
};

type Step = {
  stepIndex: number;
  type: 'CODE' | 'COORDS' | 'RADAR';
  stepData: CodeData | RadarData | CoordData;
};

type CodeData = Step & {
  title?: string;
  description?: string;
  hints: Message[];
  coords?: Coordinates;
  code: string;
};

type CoordData = Step & {
  title?: string;
  description?: string;
  hints: Message[];
  coords: Coordinates;
};

type RadarData = Step & {
  title?: string;
  description?: string;
  hints: Message[];
  coords: Coordinates;
};
