import {
  Table,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get<IPrato[]>("pratos/").then((resposta) => setPratos(resposta.data));
  }, []);

  const excluir = (pratoASerExcluido: IPrato) => {
    http.delete(`prato/${pratoASerExcluido.id}/`).then(() => {
      const listaPratos = pratos.filter(
        (pratos) => pratos.id !== pratoASerExcluido.id
      );
      setPratos([...listaPratos]);
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>

            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>

              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                <a href={prato.imagem} target="blank">
                  {" "}
                  Ver Imagem
                </a>
              </TableCell>
              <TableCell>
                [
                <RouterLink to={`/admin/pratos/${prato.id}`}>Editar</RouterLink>
                ]<Button></Button>
              </TableCell>

              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
                >
                  {" "}
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AdministracaoPratos;
