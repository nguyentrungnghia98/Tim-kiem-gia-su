module.exports = {
    passIfHaveValidToken: (req, res, next) => {
        // Nếu chưa đăng nhập
        if (!req.isValidToken){
            return res.status(401).json({message: 'Token không hợp lệ'});
        }
    
        next();
    },

    passIfIsTeacher: (req, res, next) => {
        if (!req.userInfo || req.userInfo.role !== 1) {
            return res.status(403).json({message: 'Không đủ quyền truy cập'});
        }

        next();
    },

    passIfIsStudent: (req, res, next) => {
        if (!req.userInfo || req.userInfo.role !== 0) {
            return res.status(403).json({message: 'Không đủ quyền truy cập'});
        }

        next();
    },
}