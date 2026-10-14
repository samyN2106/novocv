export default function usePageName(path){
  const tab=String(path).split('/')
  const namePage=tab[tab.length-1]
  return {namePage}
}