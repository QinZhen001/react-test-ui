# ui kit

test

## tip

[banned default exports](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)


should `import React from 'react'` for UMD build.


## icon

[svg to react component](https://react-svgr.com/playground)

we should not import ./icon 
better: import ./icon/components/xxx   (just for tree shaking)
