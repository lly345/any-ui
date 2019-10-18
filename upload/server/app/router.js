module.exports = app => {
    const { router, controller } = app;
    router.post("/user/upload", controller.user.upload);
};
