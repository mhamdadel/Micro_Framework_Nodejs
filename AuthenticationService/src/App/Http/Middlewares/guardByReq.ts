import Action from "@/Facades/Module/Models/Action";
import Role from "@/Facades/Module/Models/Role";
import { Unauthorized } from "@/Utilts/responses";
import { NextFunction, Request, Response } from "express";

interface User {
    role?: {
        _id: string;
    };
}

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

const guardByReq = (prefix: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const roleId = req?.user?.role?._id;
        const allowedMethods = [
            "all",
            "get",
            "post",
            "put",
            "delete",
            "patch",
            "head",
            "options",
            "trace",
        ];
        try {
            const url = req.baseUrl + req.path;
            const method = req.method;

            // Check if the URL is not protected
            const actionCounts = await Action.countDocuments({ url });
            if (actionCounts < 1 && !url.startsWith('/' + prefix)) {
                return next();
            }

            if (!roleId) {
                return res.status(Unauthorized.statusCode).json(Unauthorized);
            }

            const role = await Role.findById(roleId).populate("actions");

            if (!Array.isArray(role?.actions)) {
                return res.status(Unauthorized.statusCode).json(Unauthorized);
            }

            const isAuthorized = role!.actions.find(
                (action: { url: string; type: string; }) =>
                    (action.url === url && action.type === method) ||
                    (action.url === "*" &&
                        (allowedMethods.includes(method) ||
                            action.type === "all"))
            );

            if (!isAuthorized) {
                return res.status(Unauthorized.statusCode).json(Unauthorized);
            }

            return next();
        } catch (e) {
            return res.status(Unauthorized.statusCode).json(Unauthorized);
        }
    };
};

export default guardByReq;
