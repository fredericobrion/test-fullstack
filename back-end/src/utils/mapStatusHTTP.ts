export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'OK': return 200;
    default: return 500;
  }
}