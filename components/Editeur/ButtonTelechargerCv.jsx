import { PDFDownloadLink } from '@react-pdf/renderer';
import { useTransfereDonnees } from '@/context/transfere-donnees-context';
import { useSession } from 'next-auth/react';
import { templates } from '@/lib/detail-templates';
import { ArrowDownToLine } from 'lucide-react';
export default function BoutonTelechargerCv({slug}){
  const {data,dataLoaded}=useTransfereDonnees()
  const { status } = useSession()
  const template=templates.find(el=>el.slug===slug)
   const CvPdf=template.ficherPdf



 return  <PDFDownloadLink document={<CvPdf data={data} dataLoaded={dataLoaded} slug={slug} status={status}/>} fileName="mon-cv.pdf">
      {({ loading }) => (
        <button className="border border-1 cursor-pointer border-gray-300 px-[15px] py-[5px] bg-[#5c5792] flex gap-2 items-center text-white rounded-[7px] font-semibold">
          <ArrowDownToLine size={17} />
          <span> {loading ? 'Preparing document...' : 'Telecharger'} </span>
        </button>
      )}
    </PDFDownloadLink>

}