import { MouseEvent, useCallback, useState } from "react"
import { Title } from "../../atoms"
import { OptionsBar, SearchBar, VideoCard } from "../../molecules"
import { MainFrame } from "../../templates"

import { useAuth, useYoutube } from "../../../hooks"

import { YouTubeVideo } from "../../../types/youtube"

type MainPageProps = {
   openAccount: (e?: MouseEvent<HTMLButtonElement>) => void
   openList: (e?: MouseEvent<HTMLButtonElement>) => void
}

const MainPage: React.FC<MainPageProps> = ({ openAccount, openList }) => {
   const [searchItems, setSearchItems] = useState<YouTubeVideo[]>([])
   const { logout } = useAuth()

   const handleSearchError = useCallback(async () => {
      await logout()
      openAccount()
   }, [openAccount, logout])

   return (
      <MainFrame
         title={<Title text="YouTube Mp3 Downloader" />}
         searchBar={
            <SearchBar
               setResults={results => setSearchItems(results)}
               setError={handleSearchError}
            />
         }
         searchResults={searchItems?.map(item => {
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
         })}
         options={<OptionsBar openAccount={openAccount} openList={openList} />}
      />
   )
}

export default MainPage
