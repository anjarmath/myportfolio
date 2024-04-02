// Convert a file to base64 string
export const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
  
      fileReader.readAsDataURL(new Blob([file], {type: file.type}));
  
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

 export async function externalUrlToBase64(url: string): Promise<string> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
  
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
  
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to read file as Base64.'));
          }
        };
  
        reader.onerror = () => {
          reject(new Error('Error reading file.'));
        };
  
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      throw new Error(`Failed to fetch the file`);
    }
  }

export  function removeBase64Prefix(base64String: string): string {
    return base64String.replace(/^data:[^;]+;base64,/, '');
}