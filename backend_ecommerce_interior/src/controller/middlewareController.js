import jwt from "jsonwebtoken";
// kiem tra dang nhap chua
export let verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("check token", token);

  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        // het han
        return res.status(403).json("Token not valid");
      }
      // truyen req.user  xuong du dung
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

/*Truyền quyền vào và đồng thời người nào thực hiện  
tác động vào người đó ( ví dụ xóa chỉ xóa được mình ... ) */
export const verifyTokenAndRole = (roles = []) => {
  return (req, res, next) => {
    verifyToken(req, res, () => {
      const isOwner = req.user.id == req.params.id;
      const hasRole = roles.includes(req.user.role);

      if (isOwner || hasRole) {
        next();
      } else {
        return res.status(403).json("Bạn không có quyền hạn này");
      }
    });
  };
};

//  PHÂN QUYỀN ( Truyền vào role muốn thực hiện )
export const verifyTokenAndPermission = (allowedRoles = []) => {
  return (req, res, next) => {
    verifyToken(req, res, () => {
      const hasRole = allowedRoles.includes(req.user.role);
      console.log("check req.user", req.user);
      console.log("check req.user.role", req.user.role);
      if (hasRole) {
        next();
      } else {
        return res.status(403).json("Bạn không có quyền hạn này");
      }
    });
  };
};
