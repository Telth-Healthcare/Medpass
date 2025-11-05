import React, { useState } from 'react';
import {
    Box, Tab, Typography,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';

import CourseCreationWizard from './CourseCreationWizard';
import CourseApplicationTable from './CourseApplicationTable';
import CourseCatalog from './CourseUni';

const SectionHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
}));

function CourseTab() {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1', p: 2 }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} centered>
                        <Tab label="University Applications" value="1" />
                        <Tab label="Course Creation" value="2" />
                        <Tab label="Course Catalog" value="3" />
                    </TabList>
                </Box>

                {/* Tab 1: University Applications */}
                <TabPanel value="1" sx={{ p: 0, mt: 2 }}>
                    <SectionHeader>
                        <Typography variant="h5" fontWeight="bold">
                            University Applications
                        </Typography>
                    </SectionHeader>
                    <Box sx={{ p: 1, mb: 1, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        <CourseApplicationTable />
                    </Box>
                </TabPanel>

                {/* Tab 2: Course Creation */}
                <TabPanel value="2" sx={{ p: 0, mt: 2 }}>
                    <Box sx={{ p: 1, mb: 1, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        <CourseCreationWizard />
                    </Box>
                </TabPanel>

                {/* Tab 3: Course Catalog */}
                <TabPanel value="3" sx={{ p: 0, mt: 2 }}>
                    <Box sx={{ p: 1, mb: 1, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        <CourseCatalog />
                    </Box>
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default CourseTab;
