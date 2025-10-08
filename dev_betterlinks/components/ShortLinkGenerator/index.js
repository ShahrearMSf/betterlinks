import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';

import { makeRequest, betterlinks_nonce, prefix } from '../../utils/helper';
import Select from 'react-select';

const ShortLinkGenerator = () => {
    const [postTypes, setPostTypes] = useState([]);
    const [selectedPostType, setSelectedPostType] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [postLimit, setPostLimit] = useState('');
    const [sorting, setSorting] = useState('date_desc');
    const [includeExisting, setIncludeExisting] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [postCount, setPostCount] = useState(null);
    const [countLoading, setCountLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [generationInProgress, setGenerationInProgress] = useState(false);
    const [generationStatus, setGenerationStatus] = useState(null);
    const [showCompletionMessage, setShowCompletionMessage] = useState(false);
    const [simulatedProgress, setSimulatedProgress] = useState(0);
    const [progressInterval, setProgressInterval] = useState(null);

    // Advanced filters
    const [descriptionLength, setDescriptionLength] = useState(150);
    const [redirectType, setRedirectType] = useState('301');
    const [customFieldKey, setCustomFieldKey] = useState('');
    const [manualPattern, setManualPattern] = useState('');
    const [slugType, setSlugType] = useState('existing');
    const [slugLength, setSlugLength] = useState(10);
    const [collisionHandling, setCollisionHandling] = useState('append');
    const [customTags, setCustomTags] = useState([]);
    const [betterlinkCategories, setBetterlinkCategories] = useState([]);
    const [selectedBetterlinkCategory, setSelectedBetterlinkCategory] = useState(null);
    const [betterlinkTags, setBetterlinkTags] = useState([]);
    const [selectedBetterlinkTags, setSelectedBetterlinkTags] = useState([]);
    const [linkPrefix, setLinkPrefix] = useState(prefix || 'go');

    // Load post types on mount
    useEffect(() => {
        loadPostTypes();
        loadBetterlinkCategories();
        loadBetterlinkTags();

        // Cleanup on unmount
        return () => {
            clearProgressInterval();
        };
    }, []);

    // Update categories when post type changes
    useEffect(() => {
        if (selectedPostType) {
            const postTypeData = postTypes.find(pt => pt.name === selectedPostType.value);
            if (postTypeData) {
                const categoryOptions = [];
                Object.keys(postTypeData.categories).forEach(taxonomy => {
                    const taxData = postTypeData.categories[taxonomy];
                    taxData.terms.forEach(term => {
                        categoryOptions.push({
                            value: term.id,
                            label: `${term.name} (${taxData.label})`,
                            taxonomy: taxonomy
                        });
                    });
                });
                setCategories(categoryOptions);

                const tagOptions = [];
                Object.keys(postTypeData.tags).forEach(taxonomy => {
                    const taxData = postTypeData.tags[taxonomy];
                    taxData.terms.forEach(term => {
                        tagOptions.push({
                            value: term.id,
                            label: `${term.name} (${taxData.label})`,
                            taxonomy: taxonomy
                        });
                    });
                });
                setTags(tagOptions);
            }
        }
        setSelectedCategories([]);
        setSelectedTags([]);
    }, [selectedPostType, postTypes]);

    // Update post count when filters change
    useEffect(() => {
        if (selectedPostType) {
            updatePostCount();
        } else {
            setPostCount(null);
        }
    }, [selectedPostType, selectedCategories, selectedTags, includeExisting]);

    const loadPostTypes = async () => {
        setIsLoading(true);
        try {
            const response = await makeRequest({
                action: 'betterlinks/admin/get_post_types_with_taxonomies',
                security: betterlinks_nonce
            });

            if (response.data && response.data.success) {
                setPostTypes(response.data.data);
            }
        } catch (error) {
            console.error('Error loading post types:', error);
        }
        setIsLoading(false);
    };

    const loadBetterlinkCategories = async () => {
        try {
            const response = await makeRequest({
                action: 'betterlinks/admin/get_betterlink_categories',
                security: betterlinks_nonce
            });

            if (response.data && response.data.success) {
                setBetterlinkCategories(response.data.data);
            }
        } catch (error) {
            console.error('Error loading BetterLink categories:', error);
        }
    };

    const loadBetterlinkTags = async () => {
        try {
            const response = await makeRequest({
                action: 'betterlinks/admin/get_betterlink_tags',
                security: betterlinks_nonce
            });

            if (response.data && response.data.success) {
                setBetterlinkTags(response.data.data);
            }
        } catch (error) {
            console.error('Error loading BetterLink tags:', error);
        }
    };

    const updatePostCount = async () => {
        if (!selectedPostType) {
            setPostCount(null);
            return;
        }

        try {
            const response = await makeRequest({
                action: 'betterlinks/admin/get_posts_count',
                post_type: selectedPostType.value,
                categories: selectedCategories.map(cat => cat.value),
                tags: selectedTags.map(tag => tag.value),
                include_existing: includeExisting,
                security: betterlinks_nonce
            });

            if (response && response.data && response.data.success) {
                setPostCount(response.data.data.count || 0);
            } else {
                console.error('API response error:', response);
                setPostCount(0);
            }
        } catch (error) {
            console.error('Error getting post count:', error);
            console.error('Error details:', {
                selectedPostType: selectedPostType,
                selectedCategories: selectedCategories,
                selectedTags: selectedTags,
                includeExisting: includeExisting
            });
            setPostCount(0);
        }
    };

    const handleCountPosts = async () => {
        setCountLoading(true);
        await updatePostCount();
        setCountLoading(false);
    };

    const handleGenerate = () => {
        if (!selectedPostType) {
            alert(__('Please select a post type.', 'betterlinks'));
            return;
        }
        if (postCount === 0) {
            alert(__('No posts found for the selected criteria. Please adjust your filters.', 'betterlinks'));
            return;
        }
        setShowConfirmation(true);
    };

    const confirmGeneration = async () => {
        setShowConfirmation(false);
        setGenerationInProgress(true);
        setGenerationStatus({
            progress_percent: 0,
            processed: 0,
            total: postCount,
            successful: 0,
            failed: 0,
            status: 'starting',
            message: __('Initializing bulk generation...', 'betterlinks')
        });
        setSimulatedProgress(0);
        setShowCompletionMessage(false);

        // Start simulated progress for better UX
        startSimulatedProgress();

        // Auto-configure random slug settings
        const finalSlugLength = slugType === 'random' ? 8 : slugLength; // Default 8 characters for random
        const finalCollisionHandling = slugType === 'random' ? 'append' : collisionHandling; // Auto-increment for random

        const filters = {
            post_type: selectedPostType.value,
            categories: selectedCategories.map(cat => cat.value),
            tags: selectedTags.map(tag => tag.value),
            post_limit: postLimit ? parseInt(postLimit) : 0,
            sorting,
            include_existing: includeExisting,
            description_length: descriptionLength,
            redirect_type: redirectType,
            target_url_source: 'permalink',
            custom_field_key: customFieldKey,
            manual_pattern: manualPattern,
            slug_type: slugType,
            slug_length: finalSlugLength,
            collision_handling: finalCollisionHandling,
            custom_tags: customTags,
            betterlink_category: selectedBetterlinkCategory ? selectedBetterlinkCategory.value : null,
            betterlink_tags: selectedBetterlinkTags.map(tag => tag.value),
            link_prefix: linkPrefix
        };

        // Add a small delay to show the initialization
        setTimeout(async () => {
            try {
                const response = await makeRequest({
                    action: 'betterlinks/admin/start_bulk_generation',
                    ...filters,
                    security: betterlinks_nonce
                });

                if (response.data && response.data.success) {
                    // Start polling for progress after a delay
                    setTimeout(() => {
                        pollProgress();
                    }, 2000);
                } else {
                    setGenerationInProgress(false);
                    clearProgressInterval();
                    const errorMessage = response.data && response.data.data && response.data.data.message
                        ? response.data.data.message
                        : response.data && response.data.message
                            ? response.data.message
                            : __('Failed to start generation', 'betterlinks');
                    alert(errorMessage);
                }
            } catch (error) {
                setGenerationInProgress(false);
                clearProgressInterval();
                console.error('Error starting generation:', error);
                alert(__('Error starting generation. Please try again.', 'betterlinks'));
            }
        }, 1500);
    };

    const startSimulatedProgress = () => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15; // Random increment between 0-15%
            if (progress > 85) progress = 85; // Don't go beyond 85% until real data comes

            setSimulatedProgress(progress);
            setGenerationStatus(prev => ({
                ...prev,
                progress_percent: Math.floor(progress),
                message: progress < 30
                    ? __('Analyzing posts and preparing data...', 'betterlinks')
                    : progress < 60
                        ? __('Creating short links...', 'betterlinks')
                        : __('Finalizing generation process...', 'betterlinks')
            }));
        }, 800); // Update every 800ms for visible progress

        setProgressInterval(interval);
    };

    const clearProgressInterval = () => {
        if (progressInterval) {
            clearInterval(progressInterval);
            setProgressInterval(null);
        }
    };

    const pollProgress = () => {
        const interval = setInterval(async () => {
            try {
                const response = await makeRequest({
                    action: 'betterlinks/admin/get_generation_progress',
                    security: betterlinks_nonce
                });

                if (response.data && response.data.success) {
                    const status = response.data.data;

                    // Clear simulated progress once we get real data
                    clearProgressInterval();

                    // Gradually update to real progress for smooth transition
                    setGenerationStatus(prev => ({
                        ...status,
                        progress_percent: Math.max(status.progress_percent || 0, simulatedProgress)
                    }));

                    if (status.status === 'completed' || status.status === 'cancelled') {
                        clearInterval(interval);

                        // Show completion with all details
                        setGenerationStatus({
                            ...status,
                            progress_percent: 100,
                            message: status.status === 'completed'
                                ? __('Generation completed successfully!', 'betterlinks')
                                : __('Generation was cancelled.', 'betterlinks')
                        });

                        // Show completion message for 3 seconds
                        setShowCompletionMessage(true);

                        setTimeout(() => {
                            setShowCompletionMessage(false);
                            setGenerationInProgress(false);
                            setGenerationStatus(null);
                            setSimulatedProgress(0);

                            // Reset form to initial state
                            setSelectedPostType(null);
                            setSelectedCategories([]);
                            setSelectedTags([]);
                            setSelectedBetterlinkCategory(null);
                            setSelectedBetterlinkTags([]);
                            setPostCount(null);
                            setShowAdvanced(false);
                        }, 3000); // Show success for 3 seconds
                    }
                }
            } catch (error) {
                console.error('Error polling progress:', error);
                clearInterval(interval);
                clearProgressInterval();
                setGenerationInProgress(false);
            }
        }, 3000); // Poll every 3 seconds for real data
    };

    const postTypeOptions = postTypes.map(pt => ({
        value: pt.name,
        label: pt.label
    }));

    const sortingOptions = [
        { value: 'date_desc', label: __('Created Date (Newest First)', 'betterlinks') },
        { value: 'date_asc', label: __('Created Date (Oldest First)', 'betterlinks') },
        { value: 'title_asc', label: __('Title (A-Z)', 'betterlinks') },
        { value: 'title_desc', label: __('Title (Z-A)', 'betterlinks') }
    ];

    const redirectTypeOptions = [
        { value: '301', label: __('301 (Permanent)', 'betterlinks') },
        { value: '302', label: __('302 (Temporary)', 'betterlinks') },
        { value: '307', label: __('307 (Temporary)', 'betterlinks') }
    ];

    const slugTypeOptions = [
        { value: 'existing', label: __('Existing Slug', 'betterlinks') },
        { value: 'random', label: __('Random', 'betterlinks') }
    ];

    const collisionHandlingOptions = [
        { value: 'append', label: __('Append Increment (-2, -3...)', 'betterlinks') },
        { value: 'regenerate', label: __('Regenerate', 'betterlinks') },
        { value: 'skip', label: __('Skip and Report', 'betterlinks') }
    ];

    return (
        <div className="btl-short-link-generator">

            <div className="btl-header">
                <h2>{__('Short Link Generator', 'betterlinks')}</h2>
                <div className="btl-description">
                    {__('Generate short links in bulk based on your selected filters. This tool will create BetterLinks for posts matching your criteria.', 'betterlinks')}
                </div>
            </div>

            {!generationInProgress ? (
                <>
                    <div className="btl-generator-form">
                        {/* Step 1: Required Inputs */}
                        <div className="btl-form-section">
                            <h3>{__('Required Settings:', 'betterlinks')}</h3>

                            <div className="btl-form-row">
                                <div className="btl-form-col">
                                    <div className="btl-bulk-link-form-group">
                                        <label>{__('Post Type', 'betterlinks')}*</label>
                                        <Select
                                            className="btl-custom-post-select-type"
                                            value={selectedPostType}
                                            onChange={setSelectedPostType}
                                            options={postTypeOptions}
                                            placeholder={__('Select post type...', 'betterlinks')}
                                            isLoading={isLoading}
                                            isClearable={false}
                                        />
                                    </div>
                                </div>

                                {selectedPostType && (
                                    <div className="btl-form-col">
                                        <div className="btl-bulk-link-form-group">
                                            <label>{__('Categories', 'betterlinks')}</label>
                                            {categories.length === 0 ? (
                                                <div className="btl-helper-text">
                                                    {__('This post type has no categories available.', 'betterlinks')}
                                                </div>
                                            ) : (
                                                <Select
                                                    className="btl-custom-post-select-cat"
                                                    value={selectedCategories}
                                                    onChange={setSelectedCategories}
                                                    options={categories}
                                                    placeholder={__('Select categories...', 'betterlinks')}
                                                    isMulti
                                                    isClearable
                                                    closeMenuOnSelect={false}
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* {!selectedPostType && (
                                <div className="btl-helper-text">
                                    {__('Please select a post type to see available categories.', 'betterlinks')}
                                </div>
                            )} */}

                            {postCount !== null && (
                                <div className={`btl-post-count ${postCount === 0 ? 'btl-post-count-warning' : ''}`}>
                                    {postCount === 0
                                        ? __('No posts found with current filters', 'betterlinks')
                                        : `${__('Posts found:', 'betterlinks')} ${postCount}`
                                    }
                                </div>
                            )}
                        </div>

                        {/* Step 2: Advanced Filters */}
                        <div className="btl-form-section btl-bg-white">
                            <div
                                className="btl-accordion-header"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                            >
                                <h3>{__('Advanced Filters', 'betterlinks')}</h3>
                                <span className={`btl-accordion-arrow ${showAdvanced ? 'open' : ''}`}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#19285D" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </div>

                            {showAdvanced && (
                                <div className="btl-accordion-content">
                                    {/* Sorting */}
                                    <div className="btl-subsection">
                                        <div className="btl-form-row">
                                            <div className="btl-form-col">
                                                <div className="btl-bulk-link-form-group">
                                                    <label>{__('Sorting', 'betterlinks')}</label>
                                                    <Select
                                                        value={sortingOptions.find(opt => opt.value === sorting)}
                                                        onChange={(option) => setSorting(option.value)}
                                                        options={sortingOptions}
                                                        isClearable={false}
                                                        className="btl-custom-post-select-type"
                                                    />
                                                </div>
                                            </div>

                                            <div className="btl-form-col">
                                                <div className="btl-bulk-link-form-group btl-bulk-existing-links">
                                                    <div className=" btl-bulk-checkbox-field">
                                                        <input
                                                            type="checkbox"
                                                            id="overwrite-utm"
                                                            checked={includeExisting}
                                                            onChange={(e) => setIncludeExisting(e.target.checked)}
                                                        />
                                                        <label htmlFor="overwrite-utm">{__('Overwrite Existing UTM', 'betterlinks')}</label>
                                                    </div>
                                                    <p className="btl-helper-text">{__('Regenerate links for posts that already have them', 'betterlinks')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Short Link Configuration */}
                                    <div className="btl-subsection">
                                        <h4>{__('Short Link Configuration', 'betterlinks')}</h4>

                                        <div className="btl-form-col">
                                            <div className="btl-bulk-link-form-group">
                                                <label>{__('Redirect Type', 'betterlinks')}</label>
                                                <Select
                                                    value={redirectTypeOptions.find(opt => opt.value === redirectType)}
                                                    onChange={(option) => setRedirectType(option.value)}
                                                    options={redirectTypeOptions}
                                                    isClearable={false}
                                                    className="btl-custom-post-select-type"
                                                />
                                            </div>
                                        </div>
                                        <div className="btl-form-col">
                                            <div className="btl-bulk-link-form-group">
                                                <label>{__('Link Prefix', 'betterlinks')}</label>
                                                <input
                                                    className="btl-text-field"
                                                    type="text"
                                                    value={linkPrefix}
                                                    onChange={(e) => setLinkPrefix(e.target.value)}
                                                    placeholder="Go"
                                                />
                                                <p className="btl-helper-text">
                                                    {__('The prefix will be added before your shortened URL\'s slug eg. http://localhost:10018/go/your-link-name', 'betterlinks')}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="btl-form-row">
                                            <div className="btl-form-col">
                                                <div className="btl-bulk-link-form-group">
                                                    <label>{__('Shortened URL Type', 'betterlinks')}</label>
                                                    <Select
                                                        value={slugTypeOptions.find(opt => opt.value === slugType)}
                                                        onChange={(option) => setSlugType(option.value)}
                                                        options={slugTypeOptions}
                                                        isClearable={false}
                                                        className="btl-custom-post-select-type"
                                                    />
                                                </div>
                                            </div>
                                            <div className="btl-form-col">
                                                <div className="btl-bulk-link-form-group">
                                                    <label>{__('BetterLink Category', 'betterlinks')}</label>
                                                    <Select
                                                        value={selectedBetterlinkCategory}
                                                        onChange={setSelectedBetterlinkCategory}
                                                        options={betterlinkCategories}
                                                        placeholder={__('Select BetterLink category...', 'betterlinks')}
                                                        isClearable={true}
                                                        isLoading={betterlinkCategories.length === 0}
                                                        isSearchable={true}
                                                        className="btl-custom-post-select-type"
                                                        noOptionsMessage={({ inputValue }) =>
                                                            inputValue ? __('No categories found', 'betterlinks') : __('No categories available', 'betterlinks')
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="btl-form-col">
                                            <div className="btl-bulk-link-form-group">
                                                <label>{__('BetterLink Tags', 'betterlinks')}</label>
                                                <Select
                                                    value={selectedBetterlinkTags}
                                                    onChange={setSelectedBetterlinkTags}
                                                    options={betterlinkTags}
                                                    placeholder={__('Select BetterLink tags.....', 'betterlinks')}
                                                    isClearable={true}
                                                    isLoading={betterlinkTags.length === 0}
                                                    isSearchable={true}
                                                    isMulti={true}
                                                    closeMenuOnSelect={false}
                                                    className="btl-custom-post-select-type"
                                                    noOptionsMessage={({ inputValue }) =>
                                                        inputValue ? __('No tags found', 'betterlinks') : __('No tags available', 'betterlinks')
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        {/* Confirmation Modal */}
                        {showConfirmation && (
                            <div className="btl-modal-overlay btl-fade-in" onClick={() => setShowConfirmation(false)}>
                                <div className="btl-confirmation-modal btl-slide-in" onClick={(e) => e.stopPropagation()}>
                                    {/* Modal Header */}
                                    <div className="btl-confirmation-header">
                                        <div className="btl-confirmation-header-content">
                                            <div className="btl-confirmation-title">{__('Confirm Bulk Generation', 'betterlinks')}</div>
                                            <div className="btl-confirmation-subtitle">{__('Please review your settings before proceeding', 'betterlinks')}</div>
                                        </div>
                                        <button
                                            className="btl-confirmation-close"
                                            onClick={() => setShowConfirmation(false)}
                                            aria-label={__('Close', 'betterlinks')}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Modal Body */}
                                    <div className="btl-confirmation-body">
                                        {/* Two Column Layout */}
                                        <div className="btl-confirmation-grid">
                                            {/* Content Selection */}
                                            <div className="btl-confirmation-section">
                                                <div className="btl-conf-pre-title btl-confirmation-content-title">{__('Content Selection', 'betterlinks')}</div>
                                                <div className="btl-confirmation-content-content">
                                                    <div className="btl-confirmation-post-type">
                                                        <span className="btl-confirmation-label">{__('Post Type:', 'betterlinks')}</span>
                                                        <span className="btl-confirmation-tag btl-tag-primary">{selectedPostType.label}</span>
                                                    </div>

                                                    <div className="btl-confirmation-field">
                                                        <span className="btl-confirmation-label">{__('Categories:', 'betterlinks')}</span>
                                                        <div className="btl-confirmation-tags-list">
                                                            {selectedCategories.length > 0 ? (
                                                                selectedCategories.map((cat, index) => (
                                                                    <span key={index} className="btl-confirmation-tag btl-tag-category">{cat.label}</span>
                                                                ))
                                                            ) : (
                                                                <span className="btl-confirmation-empty">{__('All categories', 'betterlinks')}</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {selectedTags.length > 0 && (
                                                        <div className="btl-confirmation-field">
                                                            <span className="btl-confirmation-label">{__('Tags:', 'betterlinks')}</span>
                                                            <div className="btl-confirmation-tags-list">
                                                                {selectedTags.map((tag, index) => (
                                                                    <span key={index} className="btl-confirmation-tag btl-tag-default">{tag.label}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Link Configuration */}
                                            <div className="btl-confirmation-section">
                                                <div className="btl-conf-pre-title btl-confirmation-link-title">{__('Link Configuration', 'betterlinks')}</div>
                                                <div className="btl-confirmation-link-content">
                                                    <div className="btl-confirmation-field">
                                                        <span className="btl-confirmation-label">{__('Redirect Type:', 'betterlinks')}</span>
                                                        <span className="btl-confirmation-value">{redirectType}</span>
                                                    </div>

                                                    <div className="btl-confirmation-field">
                                                        <span className="btl-confirmation-label">{__('Link Prefix:', 'betterlinks')}</span>
                                                        <span className="btl-confirmation-value">{linkPrefix}</span>
                                                    </div>

                                                    {selectedBetterlinkCategory && (
                                                        <div className="btl-confirmation-field">
                                                            <span className="btl-confirmation-label">{__('BetterLinks Category:', 'betterlinks')}</span>
                                                            <span className="btl-confirmation-value">{selectedBetterlinkCategory.label}</span>
                                                        </div>
                                                    )}

                                                    {selectedBetterlinkTags.length > 0 && (
                                                        <div className="btl-confirmation-field">
                                                            <span className="btl-confirmation-label">{__('BetterLinks Tags:', 'betterlinks')}</span>
                                                            <div className="btl-confirmation-tags-list">
                                                                {selectedBetterlinkTags.map((tag, index) => (
                                                                    <span key={index} className="btl-confirmation-tag btl-tag-default">{tag.label}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Posts to Process Summary */}
                                        <div className="btl-confirmation-summary">
                                            <div className="btl-confirmation-summary-count">
                                               {postCount}
                                            </div>
                                            <div className="btl-confirmation-summary-content">
                                                <div className="btl-confirmation-summary-title">{__('Posts to Process', 'betterlinks')}</div>
                                                <div className="btl-confirmation-summary-subtitle">
                                                    {__('Estimated time:', 'betterlinks')} {Math.ceil(postCount / 10)} {__('minutes', 'betterlinks')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Modal Footer */}
                                    <div className="btl-confirmation-footer">
                                        <button
                                            className="btl-confirmation-btn btl-confirmation-btn-secondary"
                                            onClick={() => setShowConfirmation(false)}
                                        >
                                            {__('Edit', 'betterlinks')}
                                        </button>
                                        <button
                                            className="btl-confirmation-btn btl-confirmation-btn-primary"
                                            onClick={confirmGeneration}
                                        >
                                            {__('Start Generation', 'betterlinks')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Action Buttons */}
                    <div className="btl-form-actions">
                        <button
                            className="btl-btn btl-btn-primary"
                            onClick={handleGenerate}
                            disabled={!selectedPostType || isLoading || generationInProgress || postCount === 0}
                        >
                            {isLoading || generationInProgress ? (
                                <>
                                    <span className="btl-spinner"></span>
                                    {__('Generating...', 'betterlinks')}
                                </>
                            ) : (
                                <>
                                    {__('Generate Short Links', 'betterlinks')}
                                    {postCount !== null && postCount > 0 && (
                                        <> ({postCount})</>
                                    )}
                                </>
                            )}
                        </button>
                    </div>
                </>
            ) : (
                /* Progress Display */
                <div className="btl-progress-container btl-fade-in">
                    <div className="btl-progress-header">
                        <div className="btl-progress-icon btl-spinning">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="btl-progress-text">
                            <h3 className="btl-progress-title">{__('Generation in Progress', 'betterlinks')}</h3>
                            <p className="btl-progress-subtitle">{__('Please wait while we create your short links', 'betterlinks')}</p>
                        </div>
                    </div>

                    {generationStatus && (
                        <div className="btl-progress-content">
                            {/* Main Progress Bar */}
                            <div className="btl-progress-main">
                                <div className="btl-progress-bar-container">
                                    <div className="btl-progress-bar">
                                        <div
                                            className="btl-progress-fill"
                                            style={{
                                                width: `${generationStatus.progress_percent || 0}%`,
                                                transition: 'width 0.5s ease-in-out'
                                            }}
                                        ></div>
                                    </div>
                                    <div className="btl-progress-percentage">
                                        {generationStatus.progress_percent || 0}%
                                    </div>
                                </div>
                            </div>

                            {/* Progress Stats */}
                            <div className="btl-progress-stats">
                                <div className="btl-stat-card btl-stat-processed">
                                    <div className="btl-stat-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="btl-stat-content">
                                        <div className="btl-stat-number">{generationStatus.processed || 0}</div>
                                        <div className="btl-stat-label">{__('Processed', 'betterlinks')}</div>
                                    </div>
                                </div>

                                <div className="btl-stat-card btl-stat-total">
                                    <div className="btl-stat-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="btl-stat-content">
                                        <div className="btl-stat-number">{generationStatus.total || 0}</div>
                                        <div className="btl-stat-label">{__('Total Posts', 'betterlinks')}</div>
                                    </div>
                                </div>

                                <div className="btl-stat-card btl-stat-successful">
                                    <div className="btl-stat-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="btl-stat-content">
                                        <div className="btl-stat-number">{generationStatus.successful || 0}</div>
                                        <div className="btl-stat-label">{__('Successful', 'betterlinks')}</div>
                                    </div>
                                </div>

                                {(generationStatus.failed || 0) > 0 && (
                                    <div className="btl-stat-card btl-stat-failed">
                                        <div className="btl-stat-icon">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 6L6 18M6 6L18 18" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="btl-stat-content">
                                            <div className="btl-stat-number">{generationStatus.failed || 0}</div>
                                            <div className="btl-stat-label">{__('Failed', 'betterlinks')}</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Status Message */}
                            {generationStatus.message && (
                                <div className="btl-progress-message">
                                    <div className="btl-message-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <span className="btl-message-text">{generationStatus.message}</span>
                                </div>
                            )}

                            {/* Estimated Time Remaining */}
                            {generationStatus.progress_percent > 0 && generationStatus.progress_percent < 100 && (
                                <div className="btl-progress-eta">
                                    <span className="btl-eta-label">{__('Estimated time remaining:', 'betterlinks')}</span>
                                    <span className="btl-eta-value">
                                        {(() => {
                                            const remainingPercent = 100 - generationStatus.progress_percent;
                                            const estimatedMinutes = Math.ceil((remainingPercent / 100) * Math.ceil((generationStatus.total || 1) / 10));
                                            return estimatedMinutes > 0 ? `${estimatedMinutes} ${__('minutes', 'betterlinks')}` : __('Almost done', 'betterlinks');
                                        })()}
                                    </span>
                                </div>
                            )}

                            {/* Completion Status */}
                            {(generationStatus.status === 'completed' || generationStatus.status === 'cancelled' || showCompletionMessage) && (
                                <div className={`btl-completion-notice ${generationStatus.status === 'completed' ? 'btl-success' : 'btl-warning'} btl-fade-in`}>
                                    <div className="btl-completion-icon">
                                        {generationStatus.status === 'completed' ? (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ) : (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 9V13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="btl-completion-content">
                                        <h4 className="btl-completion-title">
                                            {generationStatus.status === 'completed'
                                                ? __('Generation Completed!', 'betterlinks')
                                                : __('Generation Cancelled', 'betterlinks')
                                            }
                                        </h4>
                                        <p className="btl-completion-message">
                                            {generationStatus.status === 'completed'
                                                ? `${__('Successfully generated', 'betterlinks')} ${generationStatus.successful || 0} ${__('short links', 'betterlinks')}${generationStatus.failed > 0 ? ` (${generationStatus.failed} ${__('failed', 'betterlinks')})` : ''}.`
                                                : __('The generation process was cancelled.', 'betterlinks')
                                            }
                                        </p>
                                        {showCompletionMessage && (
                                            <p className="btl-completion-note">
                                                {__('Form will reset automatically in a few seconds...', 'betterlinks')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShortLinkGenerator;
