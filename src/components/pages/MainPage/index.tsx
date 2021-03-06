import { MouseEvent, useCallback, useEffect, useState } from "react"
import { Title } from "../../atoms"
import { OptionsBar, SearchBar, VideoCard } from "../../molecules"
import { MainFrame } from "../../templates"

import { useUser } from "../../../hooks"

import { YouTubeVideo } from "../../../types/youtube"

type MainPageProps = {
   openAccount: (e?: MouseEvent<HTMLButtonElement>) => void
   openList: (e?: MouseEvent<HTMLButtonElement>) => void
}

const MainPage: React.FC<MainPageProps> = ({ openAccount, openList }) => {
   const [searchItems, setSearchItems] = useState<YouTubeVideo[]>([])
   const [searchError, setSearchError] = useState("")
   const { logout, user, getUser } = useUser()

   useEffect(() => {
      getUser()
   }, [getUser])

   useEffect(() => {
      if (user) {
         setSearchError("")
      }
   }, [user])

   const handleSearchError = useCallback(
      async (err: string) => {
         if (err === "You are not logged in") {
            await logout()
            openAccount()
         }
         setSearchError(err)
      },
      [openAccount, logout]
   )

   return (
      <MainFrame
         title={<Title text="YouTube Mp3 Downloader" />}
         searchBar={
            <SearchBar
               setResults={results => setSearchItems(results)}
               setError={handleSearchError}
            />
         }
         searchResults={
            !searchError ? (
               searchItems?.map(item => {
                  if (item.duration === "0:00") return <></>
                  return (
                     <VideoCard
                        key={item.id.videoId}
                        thumbnail={item.snippet.thumbnails.medium}
                        title={item.snippet.title}
                        duration={item.duration}
                        id={item.id.videoId}
                     />
                  )
               })
            ) : (
               <h2>{searchError}</h2>
            )
         }
         options={<OptionsBar openAccount={openAccount} openList={openList} />}
      />
   )
}

export default MainPage
