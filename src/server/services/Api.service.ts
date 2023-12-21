import config from '@/lib/config';
import { NextApiRequest, NextApiResponse } from 'next';

interface ApiServiceHandlerOpts {
  delete?: unknown;
  get?: unknown;
  patch?: unknown;
  post?: unknown;
  put?: unknown;
}

type EndpointHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: unknown,
) => Promise<unknown>;

abstract class ApiService {
  static handleError(req: NextApiRequest, res: NextApiResponse, error: unknown) {
    res.status(500).json(error);
  }

  static handleNotImplemented(req: NextApiRequest, res: NextApiResponse) {
    return res.status(405).end();
  }

  static handler({ delete: remove, get, patch, post, put }: ApiServiceHandlerOpts) {
    return async (req: NextApiRequest, res: NextApiResponse, next: unknown) => {
      let result;
      try {
        if (req.method === 'DELETE' && remove) {
          result = await (remove as EndpointHandler)(req, res, next);
        } else if (req.method === 'GET' && get) {
          result = await (get as EndpointHandler)(req, res, next);
        } else if (req.method === 'PATCH' && patch) {
          result = await (patch as EndpointHandler)(req, res, next);
        } else if (req.method === 'POST' && post) {
          result = await (post as EndpointHandler)(req, res, next);
        } else if (req.method === 'PUT' && put) {
          result = await (put as EndpointHandler)(req, res, next);
        } else return this.handleNotImplemented(req, res);
        return this.handleResult(req, res, result);
      } catch (error) {
        if (config.node.isDevEnv()) console.error(error);
        return this.handleError(req, res, error);
      }
    };
  }

  static handleResult(req: NextApiRequest, res: NextApiResponse, result: unknown) {
    console.log(result);
    res.status(200).json(result);
  }
}

export default ApiService;
