const fs = require('fs');

function توليد_عقد_ERC20(الاسم, الرمز, الكمية) {
  const قالب = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

  contract ${الاسم} is ERC20 {
      constructor() ERC20("${الاسم}", "${الرمز}") {
          _mint(msg.sender, ${الكمية} * 10 ** decimals());
      }
  }
  `;
  fs.writeFileSync('./contracts/Token.sol', قالب);
  console.log("✅ تم توليد العقد الذكي بنجاح");
}

// مثال: أمر بلغة عربية
توليد_عقد_ERC20("الريان", "RYN", 1000000);0

