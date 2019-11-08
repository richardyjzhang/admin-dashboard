const getByEnv = () => {
  let host = '';

  const env = process.env.API_ENV;

  switch (env) {
    case 'stage': {
      host = '192.168.0.101';
      break;
    }
    case 'prod': {
      host = 'www.xxx.com';
      break;
    }
    default: {
      host = '192.168.0.101:4000';
      break;
    }
  }

  return host;
};

export default getByEnv();
