export interface Message {
  taxId: string;
  benefits: Benefits[];
}

export interface Benefits {
  number: string;
  typeCode: string;
}
