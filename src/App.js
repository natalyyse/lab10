import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Box, CircularProgress, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: 'green',
  color: theme.palette.primary.contrastText,
}));

const YellowTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: '#E0E0E0',
}));

const App = () => {
  const [productos, setProductos] = useState([]);
  const [recuperado, setRecuperado] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/productos/')
      .then((response) => response.json())
      .then((prod) => {
        setProductos(prod);
        setRecuperado(true);
      })
      .catch((error) => {
        console.error('Error:', error);
        setRecuperado(true);
      });
  }, []);

  return (
    <Container maxWidth="md">
      <Box my={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Bebidas
        </Typography>
        {recuperado ? (
          <TableContainer component={Paper} elevation={6}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Código</StyledTableCell>
                  <StyledTableCell>Descripción</StyledTableCell>
                  <StyledTableCell>Precio</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productos.map((prod) => (
                  <YellowTableRow key={prod.codigo}>
                    <TableCell>{prod.codigo}</TableCell>
                    <TableCell>{prod.descripcion}</TableCell>
                    <TableCell>s/.{typeof prod.precio === 'number' ? prod.precio.toFixed(2) : prod.precio}</TableCell>
                  </YellowTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <CircularProgress size={60} />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default App;
