module.exports = {
  create(wsReq, wsRes) {
    sp.log.info('request Body', wsReq.body);
    wsRes.send(wsReq.client, 'test', {});
  }
};
