import React, { useEffect, useState } from 'react';
import {
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Divider,
    Typography,
    Container,
    Paper,
    Stack,
    Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { PortfolioT, TickerSymbolT } from '../types/GlobalTypes';
import { addTickerSymbol, deleteTickerSymbol, getTickerSymbols } from '../api/TickerSymbolApi';
import { addPortfolio, deletePortfolio, getPortfolios } from '../api/PortfolioApi';

const Portfolio: React.FC = () => {
    const [portfolios, setPortfolios] = useState<PortfolioT[]>([]);
    const [newPortfolioName, setNewPortfolioName] = useState<string>('');
    const [newTickerSymbol, setNewTickerSymbol] = useState<string>('');
    const [selectedPortfolioId, setSelectedPortfolioId] = useState<number | null>(null);
    const [tickerSymbols, setTickerSymbols] = useState<TickerSymbolT[]>([]);

    // Function to fetch ticker symbols for a specific portfolio
    const fetchTickerSymbols = async (portfolioId: number): Promise<void> => {
        try {
            const data = await getTickerSymbols(portfolioId);
            setTickerSymbols(data);
            setNewTickerSymbol('');
        } catch (e) {
            console.log("Error fetching ticker symbols: ", e);
            throw e;
        }
    };

    const fetchPortfolios = async (): Promise<void> => {
        try {
            const data = await getPortfolios();
            setPortfolios(data);  
        } catch (e) {
            console.log("Error fetching portfolios: ", e);
            throw e;
        }
    }

    // Initial load of portfolios
    useEffect(() => {
        fetchPortfolios();
    }, []);

    // Fetch ticker symbols when selected portfolio changes
    useEffect(() => {
        if (selectedPortfolioId) {
            fetchTickerSymbols(selectedPortfolioId);
        }
    }, [selectedPortfolioId]);

    const handleAddPortfolio = async (): Promise<void> => {
        if (!newPortfolioName.trim()) return;
        try {
            await addPortfolio(newPortfolioName);
            fetchPortfolios();
            setNewPortfolioName('');
        } catch (e) {
            console.log("Error adding portfolio: ", e);
            throw e;
        }
    };

    const handleDeletePortfolio = async (id: number) => {
        try {
            await deletePortfolio(id);
            fetchPortfolios();
            if (selectedPortfolioId === id) {
                setSelectedPortfolioId(null);
                setTickerSymbols([]);
            }
        } catch (e) {
            console.log('Error deleting portfolio:', e)   
            throw e;
        }
    };

    const handleAddTickerSymbol = async (): Promise<void> => {
        if (!selectedPortfolioId || !newTickerSymbol.trim()) return;
        try {
            await addTickerSymbol(newTickerSymbol, selectedPortfolioId);
            setNewTickerSymbol('');
            fetchTickerSymbols(selectedPortfolioId);
        } catch (e) {
            console.log("Error adding ticker symbol: ", e);
            throw e;
        }
    };

    const handleDeleteTickerSymbol = async (id: number): Promise<void> => {
        try {
            await deleteTickerSymbol(id)
            if (selectedPortfolioId) {
                fetchTickerSymbols(selectedPortfolioId);
            }
        } catch (e) {
            console.log('Error deleting ticker symbol:', e);
            throw e;
        }
    };

    const handleCloseTickerScreen = () => {
        setSelectedPortfolioId(null);
        setTickerSymbols([]);
    };

    const selectedPortfolio = portfolios.find(p => p.id === selectedPortfolioId);
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ mt: 2 }}>
            <Box display="flex" justifyContent="flex-start" sx={{ mb: 2 }}>
                <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                >
                Back
                </Button>
            </Box>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Portfolios
                </Typography>
                <Box component="form" onSubmit={(e) => {
                    e.preventDefault();
                    if (newPortfolioName.trim()) {
                        handleAddPortfolio();
                    }
                }}>
                    <Stack spacing={2}>
                        <TextField
                            label="Enter Portfolio Name"
                            value={newPortfolioName}
                            onChange={(e) => setNewPortfolioName(e.target.value)}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            ADD PORTFOLIO
                        </Button>
                    </Stack>
                </Box>

                <List sx={{ mt: 2 }}>
                    {portfolios.map((portfolio) => (
                        <React.Fragment key={portfolio.id}>
                            <ListItem
                                secondaryAction={
                                    <>
                                        <Button
                                            onClick={() => setSelectedPortfolioId(portfolio.id)}
                                            variant="outlined"
                                            color="secondary"
                                            sx={{ mr: 1 }}
                                        >
                                            VIEW TICKERS
                                        </Button>
                                        <IconButton
                                            edge="end"
                                            color="error"
                                            onClick={() => handleDeletePortfolio(portfolio.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                }
                            >
                                <ListItemText
                                    primary={portfolio.name}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Paper>

            {selectedPortfolioId && (
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Manage Ticker Symbols for {selectedPortfolio?.name}
                    </Typography>
                    <Box component="form" onSubmit={(e) => {
                        e.preventDefault();
                        if (newTickerSymbol.trim()) {
                            handleAddTickerSymbol();
                        }
                    }}>
                        <Stack spacing={2}>
                            <TextField
                                label="Enter Ticker Symbol"
                                value={newTickerSymbol}
                                onChange={(e) => setNewTickerSymbol(e.target.value)}
                                fullWidth
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!newTickerSymbol.trim()}
                            >
                                ADD TICKER SYMBOL
                            </Button>
                        </Stack>
                    </Box>
                    
                    {/* Fixed height container with header */}
                    <Box 
                        sx={{ 
                            mt: 2, 
                            border: '1px solid #e0e0e0', 
                            borderRadius: 1,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {/* Header - stays fixed */}
                        <Box sx={{ 
                            p: 2, 
                            bgcolor: '#f5f5f5', 
                            borderBottom: '1px solid #e0e0e0',
                        }}>
                            <Typography variant="subtitle1">
                                Ticker Symbols ({tickerSymbols.length})
                            </Typography>
                        </Box>
                        
                        {/* Scrollable container with fixed height */}
                        <Box 
                            sx={{ 
                                maxHeight: '250px',
                                overflow: 'auto',
                                '&::-webkit-scrollbar': {
                                    width: '8px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#bdbdbd',
                                    borderRadius: '4px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    backgroundColor: '#f5f5f5',
                                }
                            }}
                        >
                            {tickerSymbols.length > 0 ? (
                                tickerSymbols.map((ticker) => (
                                    <Box 
                                        key={ticker.id}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            p: 2,
                                            borderBottom: '1px solid #e0e0e0',
                                        }}
                                    >
                                        <Typography variant="body1">
                                            {ticker.symbol}
                                        </Typography>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDeleteTickerSymbol(ticker.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                ))
                            ) : (
                                <Box sx={{ p: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        No ticker symbols added yet
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>

                    <Button
                        onClick={handleCloseTickerScreen}
                        variant="outlined"
                        color="secondary"
                        sx={{ mt: 2 }}
                    >
                        <CloseIcon sx={{ mr: 1 }} />
                        Close Ticker Screen
                    </Button>
                </Paper>
            )}
        </Container>
    );
};

export default Portfolio;