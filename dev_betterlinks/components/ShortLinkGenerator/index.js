import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeRequest, betterlinks_nonce, prefix, plugin_root_url, is_pro_enabled, pro_version_check } from '../../utils/helper';
import { useUpgradeProModal } from '../../utils/customHooks';
import UpgradeToPro from '../Teasers/UpgradeToPro';
import StaticProVisulaization from './StaticProVisulaization';
import ConfirmationModal from './ConfirmationModal';
import ProgressDisplay from './ProgressDisplay';
import CompletionDisplay from './CompletionDisplay';
import { urlGenerationTypes } from '../../utils/data';
import { fetch_links_data } from '../../redux/actions/links.actions';
import Select from 'react-select';

const ShortLinkGenerator = ({ settings, fetch_links_data }) => {
    // Pro modal state
    const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();

    const [postTypes, setPostTypes] = useState([]);
    const [selectedPostType, setSelectedPostType] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [postLimit] = useState('');
    const [sorting, setSorting] = useState('date_desc');
    const [includeExisting, setIncludeExisting] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [postCount, setPostCount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [generationInProgress, setGenerationInProgress] = useState(false);
    const [generationStatus, setGenerationStatus] = useState(null);
    const [progressInterval, setProgressInterval] = useState(null);

    // Advanced filters
    const [descriptionLength] = useState(150);
    const [customFieldKey] = useState('');
    const [manualPattern] = useState('');
    const [customTags] = useState([]);
    const [redirectType, setRedirectType] = useState('301');
    const [betterlinkCategories, setBetterlinkCategories] = useState([]);
    const [selectedBetterlinkCategory, setSelectedBetterlinkCategory] = useState(null);
    const [betterlinkTags, setBetterlinkTags] = useState([]);
    const [selectedBetterlinkTags, setSelectedBetterlinkTags] = useState([]);
    const [linkPrefix, setLinkPrefix] = useState(prefix || 'go');
    const [urlSlugGenerationType, setUrlSlugGenerationType] = useState(
        settings?.url_slug_generation_type ||
        (settings?.is_random_string ? 'random_number' : 'from_title')
    );

    // Check if pro version meets minimum requirement (v2.5.0)
    const isProVersionValid = pro_version_check('2.5.0', '>=');

    // Sync URL slug generation type when settings change
    useEffect(() => {
        if (settings?.url_slug_generation_type) {
            setUrlSlugGenerationType(settings.url_slug_generation_type);
        } else if (settings?.is_random_string !== undefined) {
            setUrlSlugGenerationType(settings.is_random_string ? 'random_number' : 'from_title');
        }
    }, [settings?.url_slug_generation_type, settings?.is_random_string]);

    // Log urlSlugGenerationType changes
    useEffect(() => {
        console.log('urlSlugGenerationType:', urlSlugGenerationType);
    }, [urlSlugGenerationType]);

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
                // Sort categories alphabetically by label
                categoryOptions.sort((a, b) => a.label.localeCompare(b.label));
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
                // Sort tags alphabetically by label
                tagOptions.sort((a, b) => a.label.localeCompare(b.label));
                // setTags(tagOptions);
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
                // Sort categories alphabetically by label
                const sortedCategories = response.data.data.sort((a, b) =>
                    (a.label || '').localeCompare(b.label || '')
                );
                setBetterlinkCategories(sortedCategories);
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
                // Sort tags alphabetically by label
                const sortedTags = response.data.data.sort((a, b) =>
                    (a.label || '').localeCompare(b.label || '')
                );
                setBetterlinkTags(sortedTags);
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
        
        // Clear any existing progress intervals to prevent conflicts
        clearProgressInterval();
        
        setGenerationStatus({
            progress_percent: 0,
            processed: 0,
            total: postCount,
            successful: 0,
            failed: 0,
            status: 'starting',
            message: __('Initializing bulk generation...', 'betterlinks')
        });
        // setShowCompletionMessage(false);

        // Start simulated progress for better UX
        startSimulatedProgress();

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
            custom_tags: customTags,
            betterlink_category: selectedBetterlinkCategory ? parseInt(selectedBetterlinkCategory.value) : 0,
            betterlink_tags: selectedBetterlinkTags && selectedBetterlinkTags.length > 0 ? selectedBetterlinkTags.map(tag => parseInt(tag.value)) : [],
            link_prefix: linkPrefix,
            url_slug_generation_type: urlSlugGenerationType
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
                    
                    // Handle pro verification errors specifically
                    if (response.data && response.data.data && response.data.data.code === 'pro_required') {
                        openUpgradeToProModal();
                        return;
                    }
                    
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
        let progress = 0; // Always start from 0%
        const interval = setInterval(() => {
            // Smaller, more consistent increments for smoother progress
            const increment = Math.random() * 2 + 0.5; // Random increment between 0.5-2.5%
            progress += increment;
            
            // Cap at 99% to prevent going over 100% while keeping it smooth
            if (progress > 99) progress = 99;

            setGenerationStatus(prev => ({
                ...prev,
                progress_percent: Math.floor(progress),
                message: progress < 30
                    ? __('Analyzing posts and preparing data...', 'betterlinks')
                    : progress < 60
                        ? __('Creating short links...', 'betterlinks')
                        : __('Finalizing and optimizing links...', 'betterlinks')
            }));
        }, 400); // Update every 400ms for smooth visual progress

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

                    // Use real progress data directly - don't compare with simulated progress
                    // This ensures progress always increases monotonically based on actual server data
                    setGenerationStatus({
                        ...status,
                        progress_percent: status.progress_percent || 0
                    });

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

                        // Refresh links data when generation is completed successfully
                        if (status.status === 'completed' && fetch_links_data) {
                            fetch_links_data();
                        }

                        // Show completion message - no auto-dismiss, user must click OK
                        // setShowCompletionMessage(true);
                        setShowAdvanced(false);
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



    return (
        <div className="btl-short-link-generator">
            {/* Upgrade to Pro Modal */}
            <UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />

            {/* Pro Feature Check */}
            {!is_pro_enabled ? (
                <StaticProVisulaization openUpgradeToProModal={openUpgradeToProModal} />
            ) : (
                <>
            {!isProVersionValid && (
				<div className="btl-form-group">
					<div className="short-description">
						<b style={{ fontWeight: 700 }}>{__('Note: ', 'betterlinks')}</b>
						{__('To use the Auto Post Link Generator feature, please ensure BetterLinks Pro v2.5.0 or newer is activated', 'betterlinks')}
					</div>
				</div>
			)}
            <div className="btl-header bl-text-white">
                <h2>{__('Auto Post Link Generator', 'betterlinks')}</h2>
                <div className="btl-description">
                    {__('Generate bulk short links for any post type with advanced configuration ', 'betterlinks')}
                    <a href="https://betterlinks.io/docs/auto-post-link-generator-in-betterlinks" target="_blank">
                        {__('Learn More', 'betterlinks')}
                    </a>
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
                                        <label>{__('Choose Your Post Type:', 'betterlinks')}*</label>
                                        <Select
                                            className="btl-custom-post-select-type"
                                            classNamePrefix="btl-react-select"
                                            value={selectedPostType}
                                            onChange={setSelectedPostType}
                                            options={postTypeOptions}
                                            placeholder={__('Select post type...', 'betterlinks')}
                                            isLoading={isLoading}
                                            isClearable={false}
                                        />
                                    </div>
                                </div>

                                {selectedPostType  && categories.length > 0 && (
                                    <div className="btl-form-col">
                                        <div className="btl-bulk-link-form-group">
                                            <label>{__('Category', 'betterlinks')}</label>
                                            {categories.length === 0 ? (
                                                <div className="btl-helper-text">
                                                    {__('This post type has no categories available.', 'betterlinks')}
                                                </div>
                                            ) : (
                                                <Select
                                                    className="btl-custom-post-select-cat"
                                                    classNamePrefix="btl-react-select"
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
                                        : `${__('Post Found:', 'betterlinks')} ${postCount}`
                                    }
                                </div>
                            )}
                        </div>

                        {/* Step 2: Shortlink Configuration */}
                        <div className="btl-form-section btl-bg-white">
                            <div
                                className="btl-accordion-header"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                            >
                                <h3>{__('Short Link Configuration', 'betterlinks')}</h3>
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
                                                    <label>{__('Link Generation Order', 'betterlinks')}
                                                        <div className="btl-tooltip">
                                                            <span className="dashicons dashicons-info-outline"></span>
                                                            <span className="btl-tooltiptext">{__('Choose your preferred order to generate short links based on post order.', 'betterlinks')}</span>
                                                        </div>
                                                    </label>
                                                       
                                                    <Select
                                                        value={sortingOptions.find(opt => opt.value === sorting)}
                                                        onChange={(option) => setSorting(option.value)}
                                                        options={sortingOptions}
                                                        isClearable={false}
                                                        className="btl-custom-post-select-type"
                                                        classNamePrefix="btl-react-select"
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
                                                        <label htmlFor="overwrite-utm">{__('Overwrite Existing Short Link', 'betterlinks')}
                                                            <div className="btl-tooltip">
                                                                <span className="dashicons dashicons-info-outline"></span>
                                                                <span className="btl-tooltiptext">{__('If a post already has a short link created by BetterLinks, enabling this option will replace it with a new one using your current configuration.', 'betterlinks')}</span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <p className="btl-helper-text">{__('Overwrites existing short links on selected posts.', 'betterlinks')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Short Link Configuration */}
                                    <div className="btl-subsection">
                                        {/* <h4>{__('Short Link Configuration', 'betterlinks')}</h4> */}

                                        <div className="btl-form-col">
                                            <div className="btl-bulk-link-form-group">
                                                <label>{__('Redirect Type', 'betterlinks')}</label>
                                                <Select
                                                    value={redirectTypeOptions.find(opt => opt.value === redirectType)}
                                                    onChange={(option) => setRedirectType(option.value)}
                                                    options={redirectTypeOptions}
                                                    isClearable={false}
                                                    className="btl-custom-post-select-type"
                                                    classNamePrefix="btl-react-select"
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
                                                    {__('Note: The prefix will be added before your Shortened URL’s slug eg. https://yourdomain.com/go/your-link-name', 'betterlinks')}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="btl-form-row">
                                            <div className="btl-form-col">
                                                <div className="btl-bulk-link-form-group">
                                                    <label>{__('Permalink Structure', 'betterlinks')}
                                                         <div className="btl-tooltip">
                                                            <span className="dashicons dashicons-info-outline"></span>
                                                            <span className="btl-tooltiptext">{__('Choose how your short link permalink is structured based on type.', 'betterlinks')}</span>
                                                        </div>
                                                    </label>
                                                    <Select
                                                        value={urlGenerationTypes.find(opt => opt.value === urlSlugGenerationType)}
                                                        onChange={(option) => setUrlSlugGenerationType(option.value)}
                                                        options={urlGenerationTypes}
                                                        isClearable={false}
                                                        className="btl-custom-post-select-type"
                                                        classNamePrefix="btl-react-select"
                                                    />
                                                </div>
                                            </div>
                                            <div className="btl-form-col">
                                                <div className="btl-bulk-link-form-group">
                                                    <label>{__('BetterLinks Category', 'betterlinks')}
                                                         <div className="btl-tooltip">
                                                            <span className="dashicons dashicons-info-outline"></span>
                                                            <span className="btl-tooltiptext">{__('Assign a category to organize your links.', 'betterlinks')}</span>
                                                        </div>
                                                    </label>
                                                    <Select
                                                        value={selectedBetterlinkCategory}
                                                        onChange={setSelectedBetterlinkCategory}
                                                        options={betterlinkCategories}
                                                        placeholder={__('Select BetterLink category...', 'betterlinks')}
                                                        isClearable={true}
                                                        isLoading={betterlinkCategories.length === 0}
                                                        isSearchable={true}
                                                        className="btl-custom-post-select-type"
                                                        classNamePrefix="btl-react-select"
                                                        noOptionsMessage={({ inputValue }) =>
                                                            inputValue ? __('No categories found', 'betterlinks') : __('No categories available', 'betterlinks')
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="btl-form-col">
                                            <div className="btl-bulk-link-form-group">
                                                <label>{__('BetterLink Tags', 'betterlinks')}
                                                    <div className="btl-tooltip">
                                                        <span className="dashicons dashicons-info-outline"></span>
                                                        <span className="btl-tooltiptext">{__('Choose tags to label your links for reporting.', 'betterlinks')}</span>
                                                    </div>
                                                </label>
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
                                                    classNamePrefix="btl-react-select"
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
                        <ConfirmationModal
                            showConfirmation={showConfirmation}
                            setShowConfirmation={setShowConfirmation}
                            selectedPostType={selectedPostType}
                            selectedCategories={selectedCategories}
                            selectedTags={selectedTags}
                            redirectType={redirectType}
                            linkPrefix={linkPrefix}
                            selectedBetterlinkCategory={selectedBetterlinkCategory}
                            selectedBetterlinkTags={selectedBetterlinkTags}
                            postCount={postCount}
                            confirmGeneration={confirmGeneration}
                        />
                    </div>
                    {/* Action Buttons */}
                    <div className="btl-form-actions">
                        <button
                            className="btl-btn btl-btn-primary"
                            onClick={handleGenerate}
                            disabled={!selectedPostType || isLoading || generationInProgress || postCount === 0 || !isProVersionValid}
                        >
                            {isLoading || generationInProgress ? (
                                <>
                                    <span className="btl-spinner"></span>
                                    {__('Loading...', 'betterlinks')}
                                </>
                            ) : !isProVersionValid ? (
                                <>
                                    {__('Requires BetterLinks Pro v2.5.0+', 'betterlinks')}
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
                    {generationStatus && (
                        <>
                            <CompletionDisplay generationStatus={generationStatus} postCount={postCount} plugin_root_url={plugin_root_url} />
                            <ProgressDisplay generationStatus={generationStatus} postCount={postCount} plugin_root_url={plugin_root_url} />
                        </>
                    )}
                </div>
            )}
            {/* OK Button */}
            {
                generationStatus?.status === 'completed' && (
                <button 
                    className="btl-btn btl-btn-primary btl-completion-ok-btn"
                    onClick={() => {
                        setGenerationInProgress(false);
                        setGenerationStatus(null);
                        // setShowCompletionMessage(false);
                        // Reset form if needed
                        setSelectedPostType(null);
                        setSelectedCategories([]);
                        setPostCount(null);
                        // Refresh links data to show newly generated links
                        if (fetch_links_data) {
                            fetch_links_data();
                        }
                    }}
                >
                    {__('Finish', 'betterlinks')}
                </button>
                )
            }
            </>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    settings: state.settings?.settings || {},
});

const mapDispatchToProps = (dispatch) => ({
    fetch_links_data: bindActionCreators(fetch_links_data, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShortLinkGenerator);
