import {configure,addDecorator,addParameters} from '@storybook/react'
import {withInfo} from '@storybook/addon-info'
import React from "react"

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

// import "../src/styles/index.scss"

const wrapperStyle:React.CSSProperties = {
  padding:'20px 40px'
}

const storyWrapper = (stroyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {stroyFn()}
  </div>
)


addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({
  info:{inline:true,header:false}
})

const loaderFn = () => {
  const allExports = [
    require('../src/welcome.stories.tsx')
  ]
  const req = require.context('../src/components',true,/\.stories\.tsx$/)
  req.keys().forEach(
    name => allExports.push(req(name))
  )
}


configure(loaderFn,module)







