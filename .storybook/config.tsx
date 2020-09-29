import {configure,addDecorator,addParameters} from '@storybook/react'
import {withInfo} from '@storybook/addon-info'
import React from "react"

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

import "../src/styles/index.scss"

