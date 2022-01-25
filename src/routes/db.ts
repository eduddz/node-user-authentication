//Responsável pela configuração do banco
import { Pool } from "pg";

const connectionString = 'postgres://ytecsuuj:YxFp039QTDiNrkYtQt5kTrVxk8bh94-K@kesavan.db.elephantsql.com/ytecsuuj'
const db = new Pool({ connectionString })

export default db