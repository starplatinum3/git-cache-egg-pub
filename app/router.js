'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router方法简单测试
  // get
  router.get('/', controller.home.index);
  router.get('/test', controller.test.index);
  router.get('/test/detail', controller.test.detail);
  router.get('/test/detail0/:id', controller.test.detail0);
  // post
  router.post('/test/create', controller.test.create);
  // put
  router.put('/test/update/:id', controller.test.update);
  // delete
  router.delete('/test/delete/:id', controller.test.delete);

  // 开发文章发布接口
  router.post('/article/create', controller.article.create);// 文章发布
  router.get('/article/lists', controller.article.lists);// 文章列表查询
  router.get('/article/detail', controller.article.detail);// 文章详情查询
  router.get('/article/delete', controller.article.delete);// 文章删除

  // router.post('/gitPageRepo/getAll', controller.gitPageRepo.getAll);// getAll
  router.get('/gitPageRepo/getAll', controller.gitPageRepo.getAll);// getAll
  router.get('/gitPageRepo/getBaidu', controller.gitPageRepo.getBaidu);// getAll
  router.get('/gitPageRepo/getGithubPageRepos', controller.gitPageRepo.getGithubPageRepos);// getAll
  router.get('/gitPageRepo/getBaiduBing', controller.gitPageRepo.getBaiduBing);// getAll
  router.get('/gitPageRepo/getHttpTest', controller.gitPageRepo.getHttpTest);// getAll
  router.get('/gitPageRepo/getHttpTestRp', controller.gitPageRepo.getHttpTestRp);
  // router.get('/gitPageRepo/gotTest', controller.gitPageRepo.gotTest);
  router.get('/gitPageRepo/appBusTest', controller.gitPageRepo.appBusTest);
  // router.get('/gitPageRepo/whileReqThread/:url', controller.gitPageRepo.whileReqThread);

  router.get('/gitPageRepo/whileReqThread/', controller.gitPageRepo.whileReqThread);
  router.get('/gitPageRepo/getBatch', controller.gitPageRepo.getBatch);
  router.post('/gitPageRepo/saveGitRepos', controller.gitPageRepo.saveGitRepos);
  router.post('/gitPageRepo/getGitRepos', controller.gitPageRepo.getGitRepos);
  router.post('/gitPageRepo/getRepos', controller.gitPageRepo.getGitRepos);
  router.get('/gitPageRepo/TimeUtil', controller.gitPageRepo.TimeUtil);
  router.post('/issue/getIssue', controller.issue.getIssue);
  router.post('/issue/issues', controller.issue.issues);
  router.post('/comment/comments', controller.comment.comments);
  router.post('/auth/login', controller.auth.login);
  router.post('/public/managers/actions/login', controller.auth.login);
  router.post('/zhihu/get', controller.zhihu.get);
  router.post('/comment/CreateIssueComment', controller.comment.CreateIssueComment);
  router.post('/issue/CreateIssue', controller.issue.CreateIssue);
  
};
