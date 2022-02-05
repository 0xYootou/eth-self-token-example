// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import { YuTou } from "../contracts/YuTou.sol";
import { Ownable } from "../library/Ownable.sol";

contract YuTouMintable is YuTou, Ownable {
    
event MintingFinished();

  bool private _mintingFinished = false;

  modifier onlyBeforeMintingFinished() {
    
    require(!_mintingFinished);
    _;
  }

  /**
   * @return true if the minting is finished.
   */
  function mintingFinished() public view returns(bool) {
    
    return _mintingFinished;
  }

  /**
   * @dev Function to mint tokens
   * @param to The address that will receive the minted tokens.
   * @param amount The amount of tokens to mint.
   * @return A boolean that indicates if the operation was successful.
   */
  function mint(
    address to,
    uint256 amount
  )
    public
    onlyMinter
    onlyBeforeMintingFinished
    returns (bool)
  {
    
    _mint(to, amount);
    return true;
  }

  /**
   * @dev Function to stop minting new tokens.
   * @return True if the operation was successful.
   */
  function finishMinting()
    public
    onlyMinter
    onlyBeforeMintingFinished
    returns (bool)
  {
    
    _mintingFinished = true;
    emit MintingFinished();
    return true;
  }

}