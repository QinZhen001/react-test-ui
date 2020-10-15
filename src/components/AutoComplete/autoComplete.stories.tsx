import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AutoComplete,DataSourceType } from "./autoComplete";

interface GithubUserProps {
  login:string,
  url:string,
  avatar_url:string 
}


const SimpleComplete = () => {
  const simpleFetch = (query: string) => {
    const lakersWithNumber = [
      { value: "bradley", number: 11 },
      { value: "pope", number: 1 },
      { value: "caruso", number: 4 },
      { value: "cook", number: 2 },
      { value: "cousins", number: 15 },
      { value: "james", number: 23 },
      { value: "AD", number: 3 },
      { value: "green", number: 14 },
      { value: "howard", number: 39 },
      { value: "kuzma", number: 0 },
    ];

    return lakersWithNumber.filter(item=>
      item.value.includes(query)
    )
  };
  return (
    <>
      <AutoComplete
        fetchSuggestions={simpleFetch}
        onSelect={action("selected")}
      />
    </>
  );
};


const FetchComplete = () => {
  const handleFetch = (query:string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
    .then(res => res.json())
    .then(({ items }) => {
      console.log(items)
      return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
    })
  }

  const renderOption = (item:DataSourceType) => {
    const itemWithGithub = item as  DataSourceType<GithubUserProps>
    return (
      <>
        <h2>Name: {itemWithGithub.value}</h2>
         <p>url: {itemWithGithub.url}</p>
      </>
    )
  }

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderOption={renderOption}
    ></AutoComplete>
  )
}

storiesOf('AutoComplete Component', module)
  .add('AutoComplete', SimpleComplete)
  .add('FetchComplete', FetchComplete)