import { SSM } from "aws-sdk";

const ssm = new SSM();

export interface IEnvParameter {
  Name: string;
  Value: string | number | boolean;
}

const extractEnvVariable = (param: IEnvParameter) => {
  const name = param.Name.split("/").pop() || "";
  return { [name]: param.Value };
};

export const fetchParameters = async () => {
  const environment = process.env.ENVIRONMENT || "dev";
  const appName = process.env.APP_NAME || "app";

  const paramNames = [
    `/${appName}/${environment}/APP_NAME`,
    `/${appName}/${environment}/PORT`,
    `/${appName}/${environment}/CORS_WHITELIST`,
    `/${appName}/${environment}/DB_HOST`,
    `/${appName}/${environment}/DB_PORT`,
    `/${appName}/${environment}/DB_USER`,
    `/${appName}/${environment}/DB_PASSWORD`,
    `/${appName}/${environment}/DB_NAME`,
  ];

  const params = {
    Names: paramNames,
    WithDecryption: true,
  };

  const result = await ssm.getParameters(params).promise();

  const envVariables = result.Parameters?.reduce((acc, param) => {
    if (param.Name && param.Value !== undefined) {
      return { ...acc, ...extractEnvVariable(param as IEnvParameter) };
    }
    return acc;
  }, {});

  Object.assign(process.env, envVariables);
};
