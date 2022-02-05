# 在以太坊发布自己的 token 代码示例

本合约为了方便大家学习，直接内置了一个私钥、一个账户地址、一个合约地址，请大家不要做破坏性的使用

### 文件结构

- contracts 合约代码
- scripts 部署脚本
- test 一些测试代码，演示了如何使用 web3 和 ethers 连接合约

### 开发

```bash
yarn install
# 启动本地网络
yarn chain
```

token 代码在 `./contracts`，其中 `YuTou.sol` 是 token 合约，`YuTouMintable` 是发币合约

### 部署

编辑合约后，部署脚本在 `scripts/deploy.js`，如合约名有变化则修改

```bash
# 部署到本地网络
yarn deploy

# 部署到bsc测试网络
yarn deploytest

```

执行成功后终端，有合约地址，将地址导入钱包，即可看到 token

### 发币

钱包使用测试网络连接合约后可以获取自己的一个地址，接下去向地址发 token

修改合约地址和账户地址，在 `scripts/mint.js` 中

```bash
# 发币到自己的账户
yarn mint
```

### 回币

在合约中有一段代码

```js
//接收以太坊可以使用回退函数，在回退函数里给调用者地址发相同数量的代币
receive() external payable {
    require(msg.value > 0);
    _mint(msg.sender, msg.value);
}
constructor() public payable {
}
```

此段代码是监听 eth 主链上的转账通知，当 当前合约部署的合约地址收到 eth 转账的时候，会进入此逻辑，可以给转账发起方回复 token
