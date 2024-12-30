"use client";

import Layout from '@/components/common/Layout'
import explore from '@/data/folderData'
import Folder from '@/components/fileExplore/Folder'
import useTraverseTree from '@/hooks/useTraverseTree'
import { useState } from 'react';

function FileEx() {
  const [exploreData,setExploreData] = useState(explore)
  // console.log(exploreData)

  const {insertNode} = useTraverseTree()
  const {deleteNode} = useTraverseTree()

  const handleInsertNode = (folderId,item,isFolder)=>{
    const finalTree =  insertNode(exploreData,folderId,item,isFolder)
    setExploreData({...finalTree})
  }

  const handleDeleteNode = (folderId)=>{
    const finalTree = deleteNode(exploreData,folderId)
    setExploreData({...finalTree})
  }
  return ( 
    <Layout customClass="pt-[20px] flex justify-center px-[50px]">
    <div className='w-[60%] h-full'>
    <Folder exploreData={exploreData} handleInsertNode={handleInsertNode} handleDeleteNode={handleDeleteNode}/>
    </div>
       
    </Layout>
  )
}

export default FileEx