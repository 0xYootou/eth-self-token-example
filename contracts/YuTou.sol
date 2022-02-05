// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;
import { SafeMath } from "../library/SafeMath.sol";
import { ERC20 } from "../library/ERC20.sol";

/// @title PET 私有区块链代币合约
/// @author Aubrey
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details
contract YuTou is ERC20 {
    

  // 变量
  string private _name = 'YuTou token';
  string private _symbol = 'YuTou';
  // 8表示将令牌数量除以100000000得到其用户表示。
  uint8 private _decimals = 8;
  uint256 private _totalSupply = 10000000000000 * 10**8;
  uint256 constant private MAX_UINT256 = 2**256 - 1;
  uint256 private maxMintBlock = 0;

  // 使用 SafeMath 函数库
  using SafeMath for uint256;
  // 类比二维数组
  mapping (address => mapping (address => uint256)) private allowed;
  // 类比一维数组
  mapping (address => uint256) private balances;

  // 令牌的名称
  function name() public view returns (string memory) {
    
    return _name;
  }
  // 令牌的符号
  function symbol() public view returns (string memory) {
    
    return _symbol;
  }
  // 令牌使用的小数位数 - 例如8，表示将令牌数量除以100000000得到其用户表示。 
  function decimals() public view returns (uint8) {
    
    return _decimals;
  }
  // 返回总代币供应量
  function totalSupply() public override view returns (uint256) {
    
    return _totalSupply;
  }
  // 获取账户余额
  function balanceOf(address _owner) public override view returns (uint256 balance) {
    
    return balances[_owner];
  }
  // 给账户转账
  function transfer(address _to, uint256 _value) public override returns (bool success) {
    
    assert(0 < _value);
    require(balances[msg.sender] >= _value);
    require(_to != address(0));
    balances[msg.sender] = balances[msg.sender].sub(_value);
    balances[_to] = balances[_to].add(_value);
    emit Transfer(msg.sender, _to, _value);
    return true;
  }
  // 从账户转账到账户 
  function transferFrom(address _from, address _to, uint256 _value) public override returns (bool success) {
    
    uint256 _allowance = allowed[_from][msg.sender];
    assert (balances[_from] >= _value);
    assert (_allowance >= _value);
    assert (_value > 0);
    require(_to != address(0));
    balances[_from] = balances[_from].sub(_value);
    balances[_to] = balances[_to].add(_value);
    allowed[_from][msg.sender] = _allowance.sub(_value);
    emit Transfer(_from, _to, _value);
    return true;
  }
  // 允许 _spender 多次取回您的帐户，最高达 _value 金额； 如果再次调用此函数，它将用 _value 的当前值覆盖的 allowance 值。
  function approve(address _spender, uint256 _value) public override returns (bool success) {
    
    require(_spender != address(0));
    require((_value == 0) || (allowed[msg.sender][_spender] == 0));
    allowed[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }
  //  返回 _spender 仍然被允许从 _owner 提取的金额。
  function allowance(address _owner, address _spender) public override view returns (uint256 remaining) {
    
    return allowed[_owner][_spender];
  }

  // 内部方法 给地址 _to 初始化数量 _amount 数量的 tokens，注意 onlyOwner 修饰，只有合约创建者才有权限分配 分配会增加可发行总代币量，如果代币总量为0也可以增量发行
  function _mint(address _to, uint256 _amount) internal {
    
      require(_to != address(0));
      _totalSupply = _totalSupply.add(_amount);
      balances[_to] = balances[_to].add(_amount);
      emit Transfer(address(0), _to, _amount);
  }
  // 内部方法 销毁一定数量的令牌
  function _burn(address account, uint256 amount) internal {
    
    require(account != address(0));
    require(amount <= balances[account]);

    _totalSupply = _totalSupply.sub(amount);
    balances[account] = balances[account].sub(amount);
    emit Transfer(account, address(0), amount);
  }
  // 内部方法 从津贴中销毁一定数量的令牌
  function _burnFrom(address account, uint256 amount) internal {
    
    require(amount <= allowed[account][msg.sender]);

    // Should https://github.com/OpenZeppelin/zeppelin-solidity/issues/707 be accepted,
    // this function needs to emit an event with the updated approval.
    allowed[account][msg.sender] = allowed[account][msg.sender].sub(amount);
    _burn(account, amount);
  }
  //接收以太坊可以使用回退函数，在回退函数里给调用者地址发相同数量的代币
  receive() external payable {
      require(msg.value > 0);
      _mint(msg.sender, msg.value);
  }
  constructor() public payable {
  }

}