import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {AutoComplete} from './autoComplete'


const simpleFetch = (query:string) => {
    const lakersWithNumber = [
    {value: 'bradley', number: 11},
    {value: 'pope', number: 1},
    {value: 'caruso', number: 4},
    {value: 'cook', number: 2},
    {value: 'cousins', number: 15},
    {value: 'james', number: 23},
    {value: 'AD', number: 3},
    {value: 'green', number: 14},
    {value: 'howard', number: 39},
    {value: 'kuzma', number: 0},
  ]
  return lakersWithNumber
}

const SimpleComplete = () => {
  return (
    <AutoComplete
     fetchSuggestions = {simpleFetch}
      onSelect={action('selected')}
    />
  )
}


storiesOf('AutoComplete Component',module)
  .add('AutoComplete',SimpleComplete)