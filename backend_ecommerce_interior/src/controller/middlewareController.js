import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (
    !authHeader ||
    typeof authHeader !== "string" ||
    !authHeader.startsWith("Bearer ")
  ) {
    return res.status(401).json("Token không hợp lệ hoặc thiếu");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
    if (err) {
      console.error("Token verification error:", err.message);
      return res.status(403).json("Token không hợp lệ hoặc đã hết hạn");
    }

    req.user = user;
    next();
  });
};

//  chỉ admin
export const verifyAdminAccess = () => {
  return (req, res, next) => {
    verifyToken(req, res, () => {
      const isAdmin = req.user.role === "ADMIN";

      if (!req.user.role) {
        return res.status(403).json("Vai trò người dùng không được định nghĩa");
      }
      if (isAdmin) {
        next();
      } else {
        return res.status(403).json("Bạn không có quyền hạn này");
      }
    });
  };
};

// admin và người dùng id
export const verifyAdminAndIdAccess = () => {
  return (req, res, next) => {
    verifyToken(req, res, () => {
      const isOwner = req.user.id == req.params.id;
      const isAdmin = req.user.role === "ADMIN";

      if (isOwner || isAdmin) {
        next();
      } else {
        return res.status(403).json("Bạn không có quyền hạn này");
      }
    });
  };
};

export const verifyAdminAndIdBody = () => {
  return (req, res, next) => {
    verifyToken(req, res, () => {
      // console.log("req.user", req.user.id);
      // console.log("req.params.id", req.body.user_id);

      const isOwner = req.user.id == req.body.user_id;
      const isAdmin = req.user.role === "ADMIN";

      if (isOwner || isAdmin) {
        next();
      } else {
        return res.status(403).json("Bạn không có quyền hạn này");
      }
    });
  };
};
