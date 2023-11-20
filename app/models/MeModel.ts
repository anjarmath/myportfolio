
import { XataFile } from '@xata.io/client';

interface Me {
  greeting: string,
  desc_title: string,
  desc_content: string,
  email: string,
  mood: string,
  resume: XataFile,
  image: XataFile,
}

export default Me;