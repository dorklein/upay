import { ActionsByMain, MainAction, ParameterByMinor } from "./enums";

export type LoginWithPassword = {
  email: string;
  passwordmd5: string;
};
export type LoginWithKey = {
  key: string;
};
export type LoginData = LoginWithPassword | LoginWithKey;

export type RequestInterface<
  Main extends MainAction = MainAction,
  Minor extends ActionsByMain<Main> = ActionsByMain<Main>,
  Parameters extends ParameterByMinor<Minor> = ParameterByMinor<Minor>
> = {
  mainaction: Main;
  minoraction: Minor;
  parameters?: Parameters | undefined;
  encoding: "json";
  numberTemplate?: string | undefined;
};

// Helper function for type inference without explicit generics
export function createRequest<
  Main extends MainAction,
  Minor extends ActionsByMain<Main>,
  Parameters extends ParameterByMinor<Minor>
>(request: {
  mainaction: Main;
  minoraction: Minor;
  parameters?: Parameters | undefined;
  numberTemplate?: string | undefined;
}): RequestInterface<Main, Minor, Parameters> {
  return { ...request, encoding: "json" };
}
